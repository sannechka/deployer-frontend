import '../../App.css';
import {
    IconButton, Link, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { Project } from '../../store/endpoints/be.endpoints';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import SubmitDeployPopup from '../deploy/submit-deploy-popup';
import EditProjectPopup from './edit-project-popup';
import { FC, ReactNode } from 'react';

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
        key: 'description',
        label: 'Description',
    },
    {
        key: 'gitConfigRepository',
        label: 'Config Repository',
        render: (value: string) => <Link color="teal.500" href={value} isExternal>{value}</Link>,
    },
    {
        key: 'artifactoryDeploymentDescriptorFolder',
        label: 'Artifactory Descriptor Folder',
        render: (value: string) => <Link color="teal.500" href={value} isExternal>{value}</Link>,
    },
    {
        key: 'services',
        label: 'Services',
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
    key: 'action' as keyof Project,
    label: '',
}];
export type ProjectsTableProps = {
    projects: Project[];
}
const ProjectsTable: FC<ProjectsTableProps> = ({ projects }) => {
    const navigate = useNavigate();

    const navigateToEnvs = (id: string) => navigate(`${id}/envs`);

    return (
        <TableContainer whiteSpace="pre-line" height={'calc(100vh - 200px)'} overflowY={'auto'} >
            <Table variant="simple" size={'sm'} borderColor={'gray'}  border={1}>
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
                            {projects?.map(project => <Tr>
                                {columns.map(column => <Td
                                    key={project.id + column.key}>
                                    {column.render ?
                                        column.render(project[column.key as keyof Project])
                                        : project[column.key as keyof Project]}
                                </Td>)}
                                <Td>
                                    <Stack direction="row" spacing={0} height={'100%'}>
                                        <EditProjectPopup projectId={project.id} />
                                        <IconButton background={'transparent'} aria-label={'envs'} icon={<SearchIcon />}
                                                    onClick={() => navigateToEnvs(project.id)} />
                                        <SubmitDeployPopup projectId={project.id}/>
                                    </Stack>
                                </Td>
                            </Tr>)}
                        </>

                    }
                </Tbody>
            </Table>
        </TableContainer>);
};

export default ProjectsTable;


