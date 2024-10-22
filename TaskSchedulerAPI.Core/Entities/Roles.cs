using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Entities
{
    public class Roles//   sıkıntı burda roles tablosu db de oluşturlmamış\oluşturulamıyor // İleride ihtiyaç olursa aktif edilebilir şu an için User üzerinden halledilecek
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public ICollection<User> Users { get; set; }
    }
}
