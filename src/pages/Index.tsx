import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Advantages from '@/components/site/Advantages';
import Solutions from '@/components/site/Solutions';
import Process from '@/components/site/Process';
import Production from '@/components/site/Production';
import Logistics from '@/components/site/Logistics';
import Gallery from '@/components/site/Gallery';
import Geography from '@/components/site/Geography';
import SupplyMap from '@/components/site/SupplyMap';
import Contacts from '@/components/site/Contacts';
import Footer from '@/components/site/Footer';

const Index = () => (
  <div className="min-h-screen bg-background text-foreground antialiased">
    <Header />
    <main>
      <Hero />
      <Advantages />
      <Solutions />
      <Process />
      <Production />
      <Logistics />
      <Gallery />
      <Geography />
      <SupplyMap />
      <Contacts />
    </main>
    <Footer />
  </div>
);

export default Index;