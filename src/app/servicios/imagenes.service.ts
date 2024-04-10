import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private apiUrl = 'https://bbdd.trendingcorporate.com/connector.php';

  constructor(private http: HttpClient) { }

  getImagesByFamilyAndBrand(familia: string, marca: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => products.filter(product =>
        product.familia === familia && product.marca === marca
      ))
    );
  }
}
