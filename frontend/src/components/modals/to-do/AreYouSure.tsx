import React from 'react';

import 'styles/to-dos/delete-modal.css';

const AreYouSure: React.FC = () => {
    return (
        <div id='delete-modal'>
            <div className="container">
                <div className="cookiesContent" id="cookiesPopup">
                    <button onClick={() => {
                        const thisModal = document.getElementById('delete-modal');
                        if (thisModal) thisModal.style.display = 'none';
                    }} className="close">✖</button>
                    <span className='fas fa-trash'></span>
                    <p>Are you sure you want to delete this task ?</p>
                    <button id='delete-modal-accept' className="accept">Yeah, I'm sure!</button>
                </div>
            </div>
        </div>
    )
}

export default AreYouSure;