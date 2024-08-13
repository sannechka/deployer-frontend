import {
    Button,
    IconButton,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import {EditIcon} from "@chakra-ui/icons";
import {useRef} from "react";


const EditEnvPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <IconButton onClick={onOpen} colorScheme='gray' aria-label='edit-env' icon={<EditIcon/>}/>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit Environment</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default EditEnvPopup;


