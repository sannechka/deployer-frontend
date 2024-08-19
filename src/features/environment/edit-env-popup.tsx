import {
    Button,
    IconButton,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'
import {useRef} from "react";
import {EditIcon} from "@chakra-ui/icons";
import EnvForm from "./env-form";


const EditEnvPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <IconButton onClick={onOpen} icon={<EditIcon/>} colorScheme='gray' aria-label='deploy'/>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit environment</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <EnvForm/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Deploy
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default EditEnvPopup;


