import React from 'react'

const DeleteModal = ({ handleDelete, deletedUser }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box py-4 relative">

                    <h3 className="text-lg font-bold">Are you sure you want to delete {deletedUser.name} ??</h3>
                    <div className="block py-10">
                        <div className="absolute right-20 mr-10 bottom-4">
                            <button
                                className=' bg-red-600 text-white hover:bg-red-500 rounded-lg text-normal py-3 px-7'
                                onClick={handleDelete}
                            >Delete</button>
                        </div>
                        <label htmlFor="my-modal-3" className="btn  absolute right-2 bottom-4">cancel</label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeleteModal
