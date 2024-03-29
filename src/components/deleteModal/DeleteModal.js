import React from 'react'

const DeleteModal = ({ handleDelete, deletedUser }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box p-5 relative">

                    <h3 className="text-lg font-semibold">Are you sure you want to delete {deletedUser.name} ??</h3>
                    <div className="block py-8">
                        <div className="absolute right-24 mr-12 bottom-4">
                            <button
                                className=' bg-firstCol text-white hover:bg-secondCol rounded-lg text-normal py-2.5 px-7'
                                onClick={handleDelete}
                            >Delete</button>
                        </div>
                        <label htmlFor="my-modal-3" className=" absolute right-7 bottom-4 bg-gray-700 text-white hover:bg-gray-900 rounded-lg text-normal py-2.5 px-7">cancel</label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeleteModal
