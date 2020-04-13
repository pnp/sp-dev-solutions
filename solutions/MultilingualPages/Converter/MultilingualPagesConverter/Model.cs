using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultilingualPagesConverter
{
    public class LanguageConfig
    {
        public List<Language> languages { get; set; }
    }

    public class Language
    {
        public string code { get; set; }
        public string description { get; set; }
    }
    
    public class Local
    {
        public int localeId { get; set; }
        public string description { get; set; }
        public string code { get; set; }
    }
}
