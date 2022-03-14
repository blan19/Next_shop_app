import CategoryList from '@/components/Category';
import usePathSplit from '@/hooks/usePathSplit';
import Home from 'Layouts/Home';
import Layouts from '../../Layouts';

const Food = () => {
  const [, , category] = usePathSplit();
  return (
    <Layouts>
      <Home>
        <CategoryList category={category} />
      </Home>
    </Layouts>
  );
};

export default Food;
