using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourProject.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = "Pending";

        [MaxLength(255)]
        public string ShippingAddress { get; set; }

        [MaxLength(100)]
        public string PaymentMethod { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
