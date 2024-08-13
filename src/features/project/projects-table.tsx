import '../../App.css';
import {
    IconButton, Link, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import {Project, useGetProjectsQuery} from "../../store/endpoints/be.endpoints";
import {SearchIcon} from '@chakra-ui/icons'
import {useNavigate} from "react-router-dom";
import SubmitDeployPopup from "../deploy/submit-deploy-popup";
import EditProjectPopup from "./edit-project-popup";
import {ReactNode} from "react";


type TableColumn = {
    key: string;
    label: string;
    render?: (value: string) => ReactNode
}
const columns: TableColumn[] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'description',
        label: 'Description'
    },
    {
        key: 'gitConfigRepository',
        label: 'Config Repository',
        render: (value: string) => <Link color="teal.500" href={value} isExternal>{value}</Link>
    },
    {
        key: 'artifactoryDeploymentDescriptorFolder',
        label: 'Artifactory Descriptor Folder',
        render: (value: string) => <Link color="teal.500" href={value} isExternal>{value}</Link>
    },
    {
        key: 'services',
        label: 'Services'
    },
    {
        key: 'updatedAt',
        label: 'Updated at'
    },
    {
        key: 'createdAt',
        label: 'Created at'
    },
]

const actionColumn: TableColumn[] = [{
    key: 'action',
    label: ''
}]

const ProjectsTable = () => {
    const navigate = useNavigate();
    const {data = [], isLoading} = useGetProjectsQuery()
    const navigateToEnvs = () => navigate('/envs');

    const projects = data as Project[];
    return (
        <TableContainer whiteSpace="pre-line">
            <Table variant='simple' size={'sm'} borderColor={'gray'} border={1}>
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
                                <Stack direction='row' spacing={2}>
                                    <EditProjectPopup/>
                                    <IconButton aria-label={'envs'} icon={<SearchIcon/>} onClick={navigateToEnvs}/>
                                    <SubmitDeployPopup/>
                                </Stack>
                            </Tr>)}
                        </>

                    }
                </Tbody>
            </Table>
        </TableContainer>)
}

export default ProjectsTable;


