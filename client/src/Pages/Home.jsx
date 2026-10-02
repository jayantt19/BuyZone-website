import HeroBanner from '../Components/HeroBanner'
import ProductSection from '../Components/ProductSection';
import WhyChoose from '../Components/WhyChoose';
import Footer from '../Components/Footer';
const Home = ({ searchTerm }) => {
  return (
    <div>
      <HeroBanner/>
      <ProductSection searchTerm={searchTerm} />
      <WhyChoose/>
      <Footer/> 
    </div>
  );
}

export default Home;
