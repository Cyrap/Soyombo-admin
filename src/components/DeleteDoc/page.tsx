import { db } from "@/firebase/firebase"
import { doc } from "firebase/firestore"
import { deleteDoc } from "firebase/firestore";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const DeleteBtn = ({ postId, onDelete }: any) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    const deletePost = async () => {
        const postDoc = doc(db, "Posts", postId);
        try{
            await deleteDoc(postDoc);
            alert('success');
            // Invoke onDelete callback to inform parent component of the deletion
            onDelete(postId);
        }catch(err){
            alert(err)
        }
    };
    
    return (
        <>
            <Button onPress={onOpen}    aria-label="Delete"  color="danger" variant="bordered">Устгах</Button>
            <Modal 
                backdrop="opaque" 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Анхаар!</ModalHeader>
                            <ModalBody>
                                <p>Энэхүү мэдээллийг устгасанаар дахин сэргээх боломжгүй</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick={deletePost}  onPress={onClose}>
                                    Устгах
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteBtn;
