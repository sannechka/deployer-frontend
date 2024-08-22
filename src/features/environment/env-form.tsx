import {
    FormLabel,
    Flex,
    Input,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels, useToast, Select, IconButton, Button,
} from '@chakra-ui/react';
import '../../deploy-table.css';
import Form from 'antd/es/form';

import { forwardRef, useCallback, useImperativeHandle } from 'react';
import {
    Env,
    useGetEnvsByProjectQuery, useGetProjectsQuery,
    usePostEnvMutation,
} from '../../store/endpoints/be.endpoints';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { EnvRouteParams } from '../../page/envs-page';
import { skipToken } from '@reduxjs/toolkit/query';

export type EnvFormProps = {
    envId: string;
    onClose?: () => void;
}

export type EnvFormRefModel = {
    submit: () => void;
};

const EnvForm = forwardRef<EnvFormRefModel, EnvFormProps>(({ onClose, envId }, ref) => {

        const [form] = Form.useForm<Env>();
        const toast = useToast();
        useImperativeHandle(ref, () => ({ submit: form.submit }));
        const { data: projects = [] } = useGetProjectsQuery();
        const [postEnv] = usePostEnvMutation();
        const { projectId } = useParams<EnvRouteParams>();
        const { env } = useGetEnvsByProjectQuery(projectId ?? skipToken, {
            selectFromResult: (resp => ({
                env: resp.data?.find(it => it.id === envId),
            })),
        });
        const { services = [], _services } = useGetProjectsQuery(undefined, {
            selectFromResult: (resp => {
                const services = resp.data?.find(it => it.id === projectId)?.services ?? [];
                const _services: Record<string, any[]> = {};
                services.forEach(key => _services[key] = []);
                return {
                    services,
                    _services,
                };
            }),
        });


        const initialValues: Partial<Env> = env ?? { serviceProperties: _services };
        const handleSubmit = useCallback(
            async (values: Env) => {
                const result = await postEnv({ ...initialValues, ...values });
                if ('error' in result) {
                    toast({
                        title: 'Failed to save Env',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                    return;
                }
                toast({
                    title: 'Env saved',
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
                <Tabs variant="enclosed">
                    <TabList>
                        <Tab>Env Settings</Tab>
                        <Tab>Env Variables</Tab>
                        <Tab>Services Variables</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FormLabel fontWeight={600}>Name:</FormLabel>
                            <Form.Item
                                style={{ marginBottom: 10 }}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name can not be empty',
                                    },
                                    {
                                        whitespace: true,
                                        message: 'Name can not be empty',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
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
                                <Select disabled={!!env}>
                                    {projects.map(it => <option key={it.id} value={it.id}>{it.name}</option>)}
                                </Select>
                            </Form.Item>
                            <FormLabel fontWeight={600}>k8s Url:</FormLabel>
                            <Form.Item
                                style={{ marginBottom: 10 }}
                                name="k8sUrl"
                                rules={[
                                    {
                                        type: 'url',
                                        message: 'This field must be a valid url',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <FormLabel fontWeight={600}>Category:</FormLabel>
                            <Form.Item
                                style={{ marginBottom: 10 }}
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Category can not be empty',
                                    },
                                    {
                                        whitespace: true,
                                        message: 'Category can not be empty',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </TabPanel>
                        <TabPanel>
                            <Form.List name="envProperties">
                                {(fields, operations) => {
                                    return (
                                        <>
                                            {fields.map((field) => (
                                                <Flex width={'100%'} gap={2}>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'name']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'key can not be empty',
                                                        }]}
                                                    >
                                                        <Input placeholder={'Key'} required />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'value']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'value can not be empty',
                                                        }]}
                                                    >
                                                        <Input placeholder={'Value'} required />
                                                    </Form.Item>
                                                    <IconButton onClick={() => operations.remove(field.name)}
                                                                aria-label={'delete'} icon={<DeleteIcon />} />
                                                </Flex>
                                            ))
                                            }
                                            <Button
                                                width={150}
                                                leftIcon={<AddIcon />}
                                                onClick={() => operations.add({})}
                                            >
                                                Add Variable
                                            </Button>
                                        </>
                                    );
                                }}
                            </Form.List>
                        </TabPanel>
                        <TabPanel>
                            {services.map(it => <div>
                                <FormLabel fontWeight={600}>{it}:</FormLabel>
                                <Form.List name={['serviceProperties', it]}>
                                    {(fields, operations) => {
                                        return (
                                            <>
                                                {fields.map((field, idx) => (
                                                    <Flex width={'100%'} gap={2}>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'name']}
                                                            rules={[{
                                                                required: true,
                                                                message: 'key can not be empty',
                                                            }]}
                                                        >
                                                            <Input placeholder={'Key'} required />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'value']}
                                                            rules={[{
                                                                required: true,
                                                                message: 'value can not be empty',
                                                            }]}
                                                        >
                                                            <Input placeholder={'Value'} required />
                                                        </Form.Item>
                                                        <IconButton onClick={() => operations.remove(field.name)}
                                                                    aria-label={'delete'} icon={<DeleteIcon />} />
                                                    </Flex>
                                                ))
                                                }
                                                <Button
                                                    width={150}
                                                    leftIcon={<AddIcon />}
                                                    onClick={() => operations.add({})}
                                                >
                                                    Add Variable
                                                </Button>
                                            </>
                                        );
                                    }}
                                </Form.List>
                            </div>)}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Form>
        );
    },
);

export default EnvForm;