import '../../App.css';
import {
    Link,
    Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { Env } from '../../store/endpoints/be.endpoints';
import SubmitDeployPopup from '../deploy/submit-deploy-popup';
import EditEnvPopup from './edit-env-popup';
import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { EnvRouteParams } from '../../page/envs-page';

type TableColumn = {
    key: string;
    label: string;
    render?: (value: any) => ReactNode

}
const columns: TableColumn[] = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'k8sUrl',
        label: 'k8sUrl',
        render: (value: string) => <Link color="teal.500" href={value} isExternal>{value}</Link>,
    },
    {
        key: 'category',
        label: 'category',
    },
    {
        key: 'updatedAt',
        label: 'Updated at',
        render: (value: string) => {
            const date = new Date(value);
            return <>{date.toDateString()}</>;
        },
    },
    {
        key: 'createdAt',
        label: 'Created at',
        render: (value: string) => {
            const date = new Date(value);
            return <>{date.toDateString()}</>;
        },
    },
];

const actionColumn: TableColumn[] = [{
    key: 'action',
    label: '',
}];

export type EnvsTableProps = {
    envs: Env[]
}
const EnvsTable: FC<EnvsTableProps> = ({ envs }) => {

    const { projectId } = useParams<EnvRouteParams>();

    return (
        <TableContainer whiteSpace="pre-line">
            <Table variant="simple" size={'sm'} borderColor={'gray'} border={1}>
                <Thead>
                    <Tr>
                        <>
                            {columns.map(it => <Th key={it.key}>{it.label}</Th>)}
                            {actionColumn.map(it => <Th key={it.key}>{it.label}</Th>)}
                        </>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        <>
                            {envs?.map(env => <Tr>
                                {columns.map(column => <Td
                                    key={env.id + column.key}>
                                    {column.render ?
                                        column.render(env[column.key as keyof Env])
                                        : env[column.key as keyof Env].toString()}
                                </Td>)}
                                <Td>
                                    <Stack direction="row" spacing={0}>
                                        <EditEnvPopup envId={env.id} />
                                        <SubmitDeployPopup  envId={env.id} projectId={projectId} />
                                    </Stack>
                                </Td>
                            </Tr>)}
                        </>

                    }
                </Tbody>
            </Table>
        </TableContainer>);
};

export default EnvsTable;


