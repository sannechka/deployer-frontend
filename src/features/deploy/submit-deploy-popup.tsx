import {
    Button,
    Flex, FormControl, IconButton,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Popover, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Text, useDisclosure
} from '@chakra-ui/react'
import {SettingsIcon} from "@chakra-ui/icons";
import DeployForm from "./deploy-form";
import {useRef} from "react";


const SubmitDeployPopup = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <IconButton onClick={onOpen} icon={<SettingsIcon/>} colorScheme='gray' aria-label='deploy'/>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Deploy</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <DeployForm/>
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

export default SubmitDeployPopup;


