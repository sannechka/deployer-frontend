import {
    Button,
    IconButton,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import DeployForm, { DeployFormProps, DeployFormRefModel } from './deploy-form';
import { FC, useRef } from 'react';


const SubmitDeployPopup: FC<DeployFormProps> = ({ envId, projectId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formRef = useRef<DeployFormRefModel>(null);

    return (
        <>
            <IconButton background={'transparent'} onClick={onOpen} icon={<ArrowRightIcon/>} colorScheme="gray" aria-label="deploy" />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deploy</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <DeployForm ref={formRef} envId={envId} projectId={projectId} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => formRef?.current?.submit()}>
                            Deploy
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

};

export default SubmitDeployPopup;


