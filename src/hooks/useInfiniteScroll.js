import { useEffect } from 'react';

const useInfiniteScroll = (ref, callback) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && ref.current.scrollTop === 0) {
        callback();
      }
    };
    const node = ref.current;
    if (node) {
      node.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (node) {
        node.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, callback]);
};

export default useInfiniteScroll; 