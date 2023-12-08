import './headers.css'

function Header() {
    return ( 
        <header className='p-3 mb-3 border-bottom text-bg-dark'>
            <div className='d-flex flex-wrap justify-content-end'> 
            <button type="button" class="btn btn-danger"><i class="bi bi-box-arrow-right"></i> Logout</button>
            </div>

        </header>
     );
}

export default Header;