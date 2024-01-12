import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import GridView from './components/Dashboard/GridView/GridView';
import Product from './components/Dashboard/Product/Product';
import Products from './components/Dashboard/Products/Products';
import TabularView from './components/Dashboard/TabularView/TabularView';
import Home from './components/Home/Home/Home';
import Login from './components/Home/Login/Login';
import Registration from './components/Home/Registration/Registration';
import RequireAuth from './components/RequireAuth/RequireAuth';
import AuthProvider from './context/AuthProvider';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/tabularview' element={<TabularView/>}/>
            <Route path='/gridview' element={<GridView/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
