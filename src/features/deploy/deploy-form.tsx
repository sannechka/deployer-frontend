import {
    FormLabel,
    Select,
    Input, useToast,
} from '@chakra-ui/react';
import '../../deploy-table.css';
import Form from 'antd/es/form';
import {
    Deployment,
    useGetEnvsQuery,
    useGetProjectsQuery,
    usePostDeploymentMutation,
} from '../../store/endpoints/be.endpoints';
import { forwardRef, useCallback, useImperativeHandle } from 'react';

export type DeployFormProps = {
    envId?: string;
    projectId?: string;
    onClose?: () => void;
}

export type DeployFormRefModel = {
    submit: () => void;
};
const DeployForm = forwardRef<DeployFormRefModel, DeployFormProps>(({ onClose, envId, projectId }, ref) => {
    const [form] = Form.useForm<Deployment>();
    const [postDeployment] = usePostDeploymentMutation();
    const { data: projects = [] } = useGetProjectsQuery();
    const { data: envs = [] } = useGetEnvsQuery();
    const toast = useToast();
    useImperativeHandle(ref, () => ({ submit: form.submit }));

    const initialValues: Partial<Deployment> = { projectId: projectId, envId: envId };

    const handleSubmit = useCallback(
        async (values: Deployment) => {
            const result = await postDeployment({ ...initialValues, ...values });
            if ('error' in result) {
                toast({
                    title: 'Failed to Deploy',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            toast({
                title: 'Deployed',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose?.();
        },
        [],
    );

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>

            <FormLabel fontWeight={600}>Project:</FormLabel>
            <Form.Item
                style={{ marginBottom: 10 }}
                name="projectId"
                rules={[
                    {
                        required: true,
                        message: 'Project can not be empty',
                    },
                ]}
            >
                <Select disabled={!!projectId}>
                    {projects.map(it => <option key={it.id} value={it.id}>{it.name}</option>)}
                </Select>
            </Form.Item>
            <FormLabel fontWeight={600}>Environment:</FormLabel>
            <Form.Item
                style={{ marginBottom: 10 }}
                name="envId"
                rules={[
                    {
                        required: true,
                        message: 'Env can not be empty',
                    },
                ]}
            >
                <Select disabled={!!envId}>
                    {envs.map(it => <option key={it.id} value={it.id}>{it.name}</option>)}
                </Select>
            </Form.Item>
            <FormLabel fontWeight={600}>Namespace:</FormLabel>
            <Form.Item
                style={{ marginBottom: 10 }}
                name="namespace"
                rules={[
                    {
                        required: true,
                        message: 'Namespace can not be empty',
                    },
                    {
                        whitespace: true,
                        message: 'Namecpace can not be empty',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <FormLabel fontWeight={600}>Descriptor Version:</FormLabel>
            <Form.Item
                style={{ marginBottom: 10 }}
                name="descriptorVersion"
                rules={[
                    {
                        required: true,
                        message: 'Version can not be empty',
                    },
                    {
                        whitespace: true,
                        message: 'Version can not be empty',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );

});

export default DeployForm;