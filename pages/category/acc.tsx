import CategoryList from '@/components/Category';
import usePathSplit from '@/hooks/usePathSplit';
import Home from 'Layouts/Home';
import Layouts from '../../Layouts';

const Acc = () => {
  const [, , category] = usePathSplit();
  return (
    <Layouts>
      <Home>
        <CategoryList category={category} />
      </Home>
    </Layouts>
  );
};

export default Acc;
