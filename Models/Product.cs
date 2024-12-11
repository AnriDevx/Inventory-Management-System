using System.ComponentModel.DataAnnotations;

namespace KakhetiStore.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "The Name field must be between 1 and 50 characters.")]
        [RegularExpression(@"^[^\d\s][^\d]*$", ErrorMessage = "The Name field cannot start with a number or have leading/trailing spaces.")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^(Phones|Laptops|Console Games|Console Accessories|Smartwatches|Headphones|Cameras|Home Appliances|Fitness Equipment|Office Supplies)$", ErrorMessage = "Invalid Category.")]
        public string Category { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "The Unit Price must be greater than zero.")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "The Quantity in Stock cannot be negative.")]
        public int Quantity { get; set; }
    }
}
