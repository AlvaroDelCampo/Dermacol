//lista-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];
  page = 1;
  itemsPerPage = 10; // Número de elementos por página
  filtroBusqueda: string = '';
  filtroFamilia: string = '';
  familias: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // Método para obtener productos desde la API
  obtenerProductos(): void {
    this.http.get<any[]>('https://pruebatest.trendingcorporate.com/connector.php').subscribe(data => {
      this.productos = data;
      this.obtenerFamilias();
    });
  }

  // Método para obtener las familias de productos
  obtenerFamilias(): void {
    this.familias = Array.from(new Set(this.productos.map(producto => producto.familia)));
  }

  // Método para filtrar los productos por término de búsqueda y familia
  filtrarProductos(): any[] {
    let productosFiltrados = this.productos;

    // Filtrar por término de búsqueda
    if (this.filtroBusqueda) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombre_producto.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        producto.reference.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      );
    }

    // Filtrar por familia
    if (this.filtroFamilia) {
      productosFiltrados = productosFiltrados.filter(producto => producto.familia === this.filtroFamilia);
    }

    return productosFiltrados;
  }

  // Método para obtener los productos de la página actual
  obtenerProductosPaginados(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filtrarProductos().slice(startIndex, endIndex);
  }

  // Método para cambiar la página
  onPageChange(page: number): void {
    this.page = page;
  }
}
