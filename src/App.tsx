import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Instagram, 
  Youtube, 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { allData } from './data';

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'sular', label: 'Sular' },
  { id: 'abdest', label: 'Abdest' },
  { id: 'necaset', label: 'Necaset' },
  { id: 'mesh', label: 'Mesh' },
  { id: 'teyemmüm', label: 'Teyemmüm' },
  { id: 'gusül', label: 'Gusül' },
  { id: 'hayız', label: 'Hayız & Nifas' },
  { id: 'namaz', label: 'Namaz' },
  { id: 'kurban', label: 'Kurban' },
  { id: 'av', label: 'Av' },
  { id: 'umre', label: 'Hac & Umre' },
  { id: 'zekat', label: 'Zekat & Sadaka' },
  { id: 'oruç', label: 'Oruç' },
  { id: 'nikah', label: 'Nikah' },
  { id: 'talak', label: 'Talak' },
  { id: 'sefer', label: 'Sefer' },
  { id: 'yemin', label: 'Yemin' },
  { id: 'cenaze', label: 'Cenaze' },
  { id: 'miras', label: 'Miras' },
  { id: 'fıkıh', label: 'Fıkıh' },
  { id: 'ahlak', label: 'Ahlak' },
  { id: 'eğitim', label: 'Eğitim' },
  { id: 'akaid', label: 'Akaid' },
  { id: 'finans', label: 'Finans' },
  { id: 'ticaret', label: 'Ticaret' },
  { id: 'ibadet', label: 'İbadet' },
  { id: 'sağlık', label: 'Tıp & Sağlık' },
  { id: 'yeme', label: 'Yeme & İçme' },
  { id: 'aile', label: 'Aile & Yaşam' },
];

const PER_PAGE = 20;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter data based on search and category
  const filteredData = useMemo(() => {
    let data = [...allData];
    if (activeCategory !== 'all') {
      data = data.filter(item => item.c === activeCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      data = data.filter(item => 
        item.s.toLowerCase().includes(q) || 
        item.r.toLowerCase().includes(q)
      );
    }
    return data;
  }, [activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / PER_PAGE);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredData.slice(start, start + PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [activeCategory, searchTerm]);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const wingSize = 2;

    pages.push(1);
    let start = Math.max(2, currentPage - wingSize);
    let end = Math.min(totalPages - 1, currentPage + wingSize);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return (
      <div className="flex justify-center items-center gap-2 mt-12 p-4">
        {pages.map((p, idx) => (
          p === '...' ? (
            <span key={`dots-${idx}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => handlePageChange(p)}
              className={`pagination-btn ${p === currentPage ? 'active' : ''}`}
            >
              {p}
            </button>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center glass-card p-4 md:p-6 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 gap-6"
        >
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div 
              className="sufem-logo-btn group" 
              onClick={() => window.location.reload()}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl overflow-hidden">
                <img 
                  src="https://i.ibb.co/kVg5Jg69/logo-yeni.png" 
                  alt="SUFEM Logo" 
                  className="w-full h-full object-contain p-1 transform group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-black text-emerald-900 tracking-tighter leading-none">SUFEM</h1>
              </div>
            </div>
            
            <div className="h-12 w-px bg-emerald-900/10 hidden md:block"></div>
            
            <div className="text-left block">
              <h2 className="text-sm md:text-lg font-bold text-emerald-950 leading-tight uppercase tracking-tight serif">
                Sultander Fıkıh İhtisas Eğitim Merkezi
              </h2>
              <p className="text-[9px] md:text-[11px] font-semibold text-amber-600 tracking-[0.2em] mt-1 uppercase">
                Fetva ve Fıkhi Araştırmalar Portalı
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Instagram, url: 'https://www.instagram.com/sultander_' },
              { icon: Youtube, url: 'https://www.youtube.com/@sultandernegii' },
              { icon: MessageCircle, url: 'https://wa.me/' }
            ].map((social, i) => (
              <motion.a 
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-800 shadow-sm border border-emerald-50 hover:bg-emerald-900 hover:text-white transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-8 relative overflow-hidden rounded-[3rem] bg-emerald-900 p-8 md:p-12 text-white shadow-2xl shadow-emerald-900/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <Star className="w-4 h-4 text-emerald-950 fill-current" />
                </div>
                <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">Günün Fetvası</span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-bold mb-6 serif italic leading-tight">
                "İlim öğrenmek her Müslüman erkek ve kadına farzdır."
              </h3>
              
              <p className="text-emerald-100/80 text-lg mb-8 max-w-2xl leading-relaxed">
                Fıkıh portalımızda merak ettiğiniz tüm dini soruların cevaplarını muteber kaynaklar ışığında bulabilirsiniz.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span className="font-medium text-sm">7/24 Fetva Hattı</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span className="font-medium text-sm">1000+ Güncel Fetva</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span className="font-medium text-sm">25+ Kategori</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4 flex flex-col justify-center items-center p-8 rounded-[3rem] bg-amber-50 border border-amber-100 shadow-xl shadow-amber-900/5 text-center"
          >
            <p className="arabic-calligraphy text-2xl md:text-3xl mb-6 text-emerald-900">بسم الله الرحمن الرحيم</p>
            <p className="text-emerald-900/60 font-medium serif text-lg italic">
              "Allah kime hayır dilerse, onu dinde fakih (derin anlayış sahibi) kılar."
            </p>
            <div className="mt-8 w-16 h-1 bg-amber-500/30 rounded-full"></div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/10 border-2 border-emerald-50 focus-within:border-emerald-500 transition-all overflow-hidden p-2">
            <div className="pl-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-emerald-900" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-4 py-5 text-emerald-900 placeholder-emerald-900 focus:outline-none text-lg md:text-xl font-medium" 
              placeholder="Merak ettiğiniz bir konu..."
            />
            <button 
              className="bg-emerald-900 hover:bg-emerald-800 text-white px-8 md:px-12 py-5 rounded-[1.5rem] font-bold transition-all flex items-center gap-3 whitespace-nowrap shrink-0 active:scale-95 shadow-lg shadow-emerald-900/20"
            >
              <span>Fetva Ara</span>
              <ChevronRight className="w-5 h-5 hidden md:block" />
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-8 glass-card p-6 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50">
              {/* Mobile Toggle */}
              <div className="flex items-center justify-between mb-6 px-2 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-900 p-2.5 rounded-xl shadow-lg shadow-emerald-900/20">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-emerald-950 font-black text-xl tracking-tight serif">KONU BAŞLIKLARI</h3>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Desktop Header */}
              <div className="hidden lg:flex items-center gap-3 mb-8 px-2">
                <div className="bg-emerald-900 p-2.5 rounded-xl shadow-lg shadow-emerald-900/20">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-emerald-950 font-black text-xl tracking-tight serif">KONU BAŞLIKLARI</h3>
              </div>
              
              {/* Category List */}
              <div className={`flex flex-col gap-1.5 pr-2 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`cat-btn group p-3 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-sm transition-all ${activeCategory === cat.id ? 'active' : ''}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeCategory === cat.id ? 'bg-white scale-125' : 'bg-emerald-200 group-hover:bg-emerald-400'}`}></div>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="grid gap-6 items-start">
              <AnimatePresence mode="popLayout">
                {pageData.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    key={`${item.s}-${idx}`}
                    className={`faq-item group ${expandedId === idx ? 'active' : ''}`}
                    onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  >
                    <div className="w-full text-left px-8 py-7 flex justify-between items-center">
                      <span className="font-bold text-black text-sm md:text-base pr-6 leading-snug group-hover:text-gray-700 transition-colors">{item.s}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${expandedId === idx ? 'bg-emerald-900 text-white rotate-45' : 'bg-emerald-50 text-emerald-300 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                        <span className="text-2xl font-light">+</span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedId === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8">
                            <div className="mb-6 flex items-center justify-center">
                              <div className="h-0.5 bg-black flex-1"></div>
                              <div className="px-3">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                              </div>
                              <div className="h-0.5 bg-black flex-1"></div>
                            </div>
                            {item.v && (
                              <div className="mb-4">
                                <div className="verdict-tag">{item.v}</div>
                              </div>
                            )}
                            <div className="text-black text-base md:text-lg leading-relaxed prose prose-black max-w-none serif">
                              <ReactMarkdown>{item.r}</ReactMarkdown>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredData.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-white/50 rounded-[3rem] border-2 border-dashed border-emerald-100"
                >
                  <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-emerald-200" />
                  </div>
                  <p className="text-emerald-900/40 font-bold text-xl serif">Aradığınız kriterlere uygun fetva bulunamadı.</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                    className="mt-6 text-emerald-600 font-bold hover:underline"
                  >
                    Tüm fetvaları göster
                  </button>
                </motion.div>
              )}
            </div>
            {renderPagination()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500"></div>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white p-2 rounded-xl">
                  <img 
                    src="https://i.ibb.co/kVg5Jg69/logo-yeni.png" 
                    alt="SUFEM Logo" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-2xl font-black tracking-tighter">SUFEM</h4>
              </div>
              <p className="text-emerald-100/60 text-base leading-relaxed mb-8 serif italic">
                Sultander Fıkıh İhtisas Eğitim Merkezi, sahih dini bilgiyi muteber kaynaklar ışığında toplumun her kesimine ulaştırmayı gaye edinmiştir.
              </p>
              <div className="flex gap-4">
                {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-emerald-950 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg">Adres</h4>
              </div>
              <p className="text-emerald-100/60 leading-relaxed text-base">
                Turabi Sk No: 7<br />
                Akşemsettin Mah<br />
                Sultanbeyli / İstanbul
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg">İletişim</h4>
              </div>
              <div className="space-y-4">
                <a href="tel:+902164206767" className="flex items-center gap-3 text-emerald-100/60 hover:text-amber-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+90 216 420 67 67</span>
                </a>
                <a href="mailto:info@sultander.org" className="flex items-center gap-3 text-emerald-100/60 hover:text-amber-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@sultander.org</span>
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                  <Globe className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg">Resmi Wep Sitemiz</h4>
              </div>
              <a 
                href="https://www.sultander.org" 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col gap-2"
              >
                <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">www.sultander.org</span>
                <div className="text-emerald-100/40 text-sm">
                </div>
              </a>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-emerald-100/40 font-medium">
              © 2026 SUFEM Fıkıh Portalı. Tüm Hakları Saklıdır.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-emerald-100/40 hover:text-white transition-colors">Kullanım Koşulları</a>
              <a href="#" className="text-sm text-emerald-100/40 hover:text-white transition-colors">Gizlilik Politikası</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
