import {baseApi, BE_BASE_URL} from "../base-query";


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
    serviceProperties: string,
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
    endpoints: (b: any): any => ({
        getDeployments: b.query<Deployment[], void>({
            query: () => ({
                url: `${BE_BASE_URL}/deploy`,
            }),
            providesTags: ['Deployments'],
        }),
        getEnvs: b.query<Env[], string>({
            query: id => ({
                url: `${BE_BASE_URL}/env`,
            }),
            providesTags: ['Envs'],
        }),


        postDeployment: b.mutation<void, Deployment>({
            query: endpoint => ({
                method: 'POST',
                url: `${BE_BASE_URL}/v1/endpoint/${endpoint.id}`,
                body: endpoint,
            }),
            invalidatesTags: (r, err, p) => (!err ? ['Deployments', {type: 'Deployment', id: p.id}] : []),
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
    usePostDeploymentMutation,
    useGetEnvsQuery
} = beEndpoints;


