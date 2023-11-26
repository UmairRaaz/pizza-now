import { useState } from "react"


const DeleteButton = ({ label, onDelete }) => {
    const [showComfrim, setshowComfrim] = useState(false)

    if (showComfrim) {
        return (
            <div className="fixed bg-black/80 inset-0 h-full flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg ">
                    <div>Are you sure want to delete?</div>
                    <div className="flex gap-1 mt-1">
                        <button type="button" onClick={() => setshowComfrim(false)}>Cancel</button>
                        <button type="button" onClick={()=> {onDelete(); setshowComfrim(false)}} className="primary">Yes,&nbsp;Delete!</button>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <button type="button" onClick={() => { setshowComfrim(true) }}>
            {label}
        </button>
    )
}

export default DeleteButton