import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Product } from '@/types/product';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface StockDB extends DBSchema {
  products: {
    key: string;
    value: Product;
    indexes: { 'by-descripcion': string; 'by-codigo': string };
  };
}

const DB_NAME = 'stockMLujan';
const STORE_NAME = 'products';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<StockDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<StockDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<StockDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'codigo' });
        store.createIndex('by-descripcion', 'descripcion');
        store.createIndex('by-codigo', 'codigo');
      }
    },
  });

  return dbInstance;
}

export async function saveProducts(products: Product[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  
  // Clear existing data
  await tx.store.clear();
  
  // Add new products
  for (const product of products) {
    await tx.store.add(product);
  }
  
  await tx.done;
}

export async function searchProducts(
  searchCodigo: string,
  searchDescripcion: string
): Promise<Product[]> {
  // Referencia a la colección 'articulos'
  const articulosRef = collection(db, "articulos");

  try {
    let q;
    
    // Si hay código, buscar por código exacto
    if (searchCodigo) {
      q = query(articulosRef, where("codigo", "==", searchCodigo));
    } 
    // Si solo hay descripción, buscar por descripción (exacta)
    else if (searchDescripcion) {
      q = query(articulosRef, where("descripcion", "==", searchDescripcion));
    }
    // Si no hay búsqueda, obtener todos
    else {
      q = query(articulosRef);
    }

    const querySnapshot = await getDocs(q);
    const resultados: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      // Guardamos los datos de cada documento encontrado
      resultados.push(doc.data() as Product);
    });

    // Filtrar por descripción si se proporcionó (búsqueda parcial en el cliente)
    if (searchDescripcion && searchCodigo) {
      return resultados.filter((product) =>
        product.descripcion?.toLowerCase().includes(searchDescripcion.toLowerCase())
      );
    }

    return resultados;
  } catch (error) {
    console.error("Error buscando documentos: ", error);
    return [];
  }
}

export async function getProductCount(): Promise<number> {
  const db = await getDB();
  return await db.count(STORE_NAME);
}
