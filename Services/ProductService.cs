using KakhetiStore.Models; // Correct namespace
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Linq;

namespace KakhetiStore.Services
{
    public class ProductService
    {
        private const string FilePath = "Data/products.json";
        private List<Product> _products;

        public ProductService()
        {
            _products = LoadProducts();
            if (_products == null || !_products.Any())
            {
                _products = LoadInitialData();
                SaveProducts();
            }
        }

        public List<Product> GetProducts()
        {
            return _products;
        }

        public void AddProduct(Product product)
        {
            product.Id = _products.Any() ? _products.Max(p => p.Id) + 1 : 1;
            _products.Add(product);
            SaveProducts();
        }

        public void UpdateProduct(Product product)
        {
            var index = _products.FindIndex(p => p.Id == product.Id);
            if (index >= 0)
            {
                _products[index] = product;
                SaveProducts();
            }
        }

        public void DeleteProduct(int id)
        {
            _products.RemoveAll(p => p.Id == id);
            SaveProducts();
        }

        private List<Product> LoadProducts()
        {
            if (File.Exists(FilePath))
            {
                var jsonData = File.ReadAllText(FilePath);
                return JsonSerializer.Deserialize<List<Product>>(jsonData);
            }
            return new List<Product>();
        }

        private void SaveProducts()
        {
            var jsonData = JsonSerializer.Serialize(_products);
            File.WriteAllText(FilePath, jsonData);
        }

        private List<Product> LoadInitialData()
        {
            return new List<Product>
            {
                new() { Id = 1, Name = "Samsung Galaxy S20 Ultra", Category = "Phones", UnitPrice = 1199.99M, Quantity = 10 },
                new() { Id = 2, Name = "Apple iPhone 13 Pro", Category = "Phones", UnitPrice = 999.99M, Quantity = 5 },
                new() { Id = 3, Name = "Dell XPS 13", Category = "Laptops", UnitPrice = 1399.99M, Quantity = 7 },
                new() { Id = 4, Name = "MacBook Pro 16", Category = "Laptops", UnitPrice = 2499.99M, Quantity = 3 },
                new() { Id = 5, Name = "Sony PlayStation 5", Category = "Console Games", UnitPrice = 499.99M, Quantity = 0 },
                new() { Id = 6, Name = "Xbox Series X", Category = "Console Games", UnitPrice = 499.99M, Quantity = 2 },
                new() { Id = 7, Name = "Nintendo Switch", Category = "Console Games", UnitPrice = 299.99M, Quantity = 8 },
                new() { Id = 8, Name = "PlayStation DualSense Controller", Category = "Console Accessories", UnitPrice = 69.99M, Quantity = 15 },
                new() { Id = 9, Name = "Xbox Elite Wireless Controller Series 2", Category = "Console Accessories", UnitPrice = 179.99M, Quantity = 4 },
                new() { Id = 10, Name = "Apple Watch Series 7", Category = "Smartwatches", UnitPrice = 399.99M, Quantity = 6 },
                new() { Id = 11, Name = "Samsung Galaxy Watch 4", Category = "Smartwatches", UnitPrice = 249.99M, Quantity = 9 },
                new() { Id = 12, Name = "Sony WH-1000XM4", Category = "Headphones", UnitPrice = 349.99M, Quantity = 12 },
                new() { Id = 13, Name = "Bose QuietComfort 35 II", Category = "Headphones", UnitPrice = 299.99M, Quantity = 10 },
                new() { Id = 14, Name = "Canon EOS R5", Category = "Cameras", UnitPrice = 3899.99M, Quantity = 1 },
                new() { Id = 15, Name = "Nikon Z6 II", Category = "Cameras", UnitPrice = 1999.99M, Quantity = 3 },
                new() { Id = 16, Name = "Dyson V11 Vacuum", Category = "Home Appliances", UnitPrice = 599.99M, Quantity = 4 },
                new() { Id = 17, Name = "iRobot Roomba 960", Category = "Home Appliances", UnitPrice = 499.99M, Quantity = 2 },
                new() { Id = 18, Name = "Peloton Bike", Category = "Fitness Equipment", UnitPrice = 1895.00M, Quantity = 1 },
                new() { Id = 19, Name = "Bowflex SelectTech 552 Dumbbells", Category = "Fitness Equipment", UnitPrice = 349.99M, Quantity = 5 },
                new() { Id = 20, Name = "Herman Miller Aeron Chair", Category = "Office Supplies", UnitPrice = 1399.99M, Quantity = 7 },
                new() { Id = 21, Name = "Logitech MX Master 3", Category = "Office Supplies", UnitPrice = 99.99M, Quantity = 11 }
            };
        }
    }
}
