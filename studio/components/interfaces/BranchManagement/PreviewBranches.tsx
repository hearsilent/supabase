import { Button, IconExternalLink, IconGitBranch } from 'ui'

import { Branch, useBranchesQuery } from 'data/branches/branches-query'
import { BranchContainer, BranchHeader, BranchPanel } from './BranchPanels'
import { useParams } from 'common'
import { useGithubPullRequestsQuery } from 'data/integrations/integrations-github-pull-requests-query'
import { partition } from 'lodash'
import { useSelectedOrganization } from 'hooks'
import { useOrgIntegrationsQuery } from 'data/integrations/integrations-query-org-only'
import { GenericSkeletonLoader } from 'components/ui/ShimmeringLoader'
import AlertError from 'components/ui/AlertError'

interface PreviewBranchesProps {
  generateCreatePullRequestURL: (branch?: string) => string
  onSelectCreateBranch: () => void
  onSelectDeleteBranch: (branch: Branch) => void
}

const PreviewBranches = ({
  generateCreatePullRequestURL,
  onSelectCreateBranch,
  onSelectDeleteBranch,
}: PreviewBranchesProps) => {
  const { ref } = useParams()
  const selectedOrg = useSelectedOrganization()

  const { data: integrations } = useOrgIntegrationsQuery({
    orgSlug: selectedOrg?.slug,
  })
  const githubIntegration = integrations?.find(
    (integration) =>
      integration.integration.name === 'GitHub' &&
      integration.organization.slug === selectedOrg?.slug
  )
  const githubConnection = githubIntegration?.connections.find(
    (connection) => connection.supabase_project_ref === ref
  )
  const [repoOwner, repoName] = githubConnection?.metadata.name.split('/') || []

  const {
    data: branches,
    error: branchesError,
    isLoading: isLoadingBranches,
    isError: isErrorBranches,
    isSuccess: isSuccessBranches,
  } = useBranchesQuery({ projectRef: ref })
  const [[mainBranch], previewBranches] = partition(branches, (branch) => branch.is_default)

  const { data: allPullRequests } = useGithubPullRequestsQuery({
    organizationIntegrationId: githubIntegration?.id,
    repoOwner,
    repoName,
    target: mainBranch?.git_branch,
  })

  const previewBranchesNotInPR = previewBranches.filter(
    (branch) => !allPullRequests?.find((pr) => pr.branch === branch.git_branch)
  )

  return (
    <>
      {previewBranches.length > 0 && previewBranchesNotInPR.length > 0 && (
        <BranchHeader markdown={previewBranches.length > 0 ? `#### Preview branches` : undefined} />
      )}

      {isLoadingBranches && (
        <BranchContainer>
          <div className="w-full">
            <GenericSkeletonLoader />
          </div>
        </BranchContainer>
      )}

      {isErrorBranches && (
        <BranchContainer>
          <div className="w-full">
            <AlertError error={branchesError} subject="Failed to retrieve GitHub branches" />
          </div>
        </BranchContainer>
      )}

      {isSuccessBranches && (
        <>
          {previewBranches.length === 0 ? (
            <BranchContainer>
              <div className="flex items-center flex-col justify-center w-full py-8">
                <p>No database preview branches</p>
                <p className="text-scale-1000">Database preview branches will be shown here</p>
                <div className="w-[500px] border rounded-md mt-4">
                  <div className="px-5 py-3 bg-surface-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <IconGitBranch strokeWidth={2} className="text-scale-1100" />
                      <div>
                        <p>Create a preview branch</p>
                        <p className="text-scale-1000">Start developing in preview</p>
                      </div>
                    </div>
                    <Button type="default" onClick={() => onSelectCreateBranch()}>
                      Create preview branch
                    </Button>
                  </div>
                  <div className="px-5 py-3 border-t flex items-center justify-between">
                    <div>
                      <p>Not sure what to do?</p>
                      <p className="text-scale-1000">Browse our documentation</p>
                    </div>
                    <Button type="default" iconRight={<IconExternalLink />}>
                      Docs
                    </Button>
                  </div>
                </div>
              </div>
            </BranchContainer>
          ) : (
            previewBranchesNotInPR.map((branch) => (
              <BranchPanel
                key={branch.id}
                branch={branch}
                generateCreatePullRequestURL={generateCreatePullRequestURL}
                onSelectDelete={() => onSelectDeleteBranch(branch)}
              />
            ))
          )}
        </>
      )}
    </>
  )
}

export default PreviewBranches
