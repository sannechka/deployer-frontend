import { baseApi, BE_BASE_URL } from '../base-query';


export interface Deployment {
    id: string,
    descriptorVersion: string,
    namespace: string,
    projectId: string,
    envId: string,
    projectName: string,
    envName: string,
    state: string,
    gitlabPipelineId: null,
    gitlabLink: string,
    envProperties: [
        {
            name: string,
            value: string,
        }
    ],
    serviceProperties: string,
    createdAt: string,
    updatedAt: string

}

export interface Env {
    id: string,
    projectId: string,
    name: string,
    k8sUrl: string,
    category: string,
    envProperties: [
        {
            name: string,
            value: string
        }
    ],
    serviceProperties: Record<string,
        {
            name: string,
            value: string
        }[]>,
    createdAt: string,
    updatedAt: string
}


export interface Project {
    id: string,
    name: string,
    description: string,
    gitConfigRepository: string,
    artifactoryDeploymentDescriptorFolder: string,
    services: string[],
    createdAt: string,
    updatedAt: string

}


export const beEndpoints = baseApi.injectEndpoints({
    endpoints: b => ({
        getDeployments: b.query<Deployment[], void>({
            query: () => ({
                url: `${BE_BASE_URL}/deploy`,
            }),
            providesTags: ['Deployments'],
        }),
        getEnvs: b.query<Env[], void>({
            query: () => ({
                url: `${BE_BASE_URL}/env`,
            }),
            providesTags: ['Envs'],
        }),
        getEnvsByProject: b.query<Env[], string>({
            query: id => ({
                url: `${BE_BASE_URL}/env/project/${id}`,
            }),
        }),
        postEnv: b.mutation<void, Env>({
            query: env => ({
                method: 'POST',
                url: `${BE_BASE_URL}/env`,
                body: env,
            }),
        }),

        postDeployment: b.mutation<void, Deployment>({
            query: deployment => ({
                method: 'POST',
                url: `${BE_BASE_URL}/deploy`,
                body: deployment,
            }),
        }),
        postProject: b.mutation<void, Project>({
            query: project => ({
                method: 'POST',
                url: `${BE_BASE_URL}/projects`,
                body: project,
            }),
        }),
        getProjects: b.query<Project[], void>({
            query: () => ({
                url: `${BE_BASE_URL}/projects`,
            }),
            providesTags: ['Projects'],
        }),

    }),
});


export const {
    useGetDeploymentsQuery,
    useGetProjectsQuery,
    useGetEnvsByProjectQuery,
    usePostDeploymentMutation,
    usePostProjectMutation,
    usePostEnvMutation,
    useGetEnvsQuery,
} = beEndpoints;


