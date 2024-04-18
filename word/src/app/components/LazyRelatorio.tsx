import dynamic from 'next/dynamic';
// import Relatorio from './Relatorio';

const LazyRelatorio = dynamic(() => import('./Relatorio').then(module => module.default), { loading: () => <div>Carregando...</div> });

export default LazyRelatorio;

