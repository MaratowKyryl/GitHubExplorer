export interface RepositoryOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string; // contains "{/other_user}" template
  gists_url: string; // contains "{/gist_id}" template
  starred_url: string; // contains "{/owner}{/repo}" template
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string; // contains "{/privacy}" template
  received_events_url: string;
  type: string; // e.g. "User"
  user_view_type: string; // e.g. "public"
  site_admin: boolean;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;

  owner: RepositoryOwner;

  html_url: string;
  description: string | null;
  fork: boolean;

  url: string;
  forks_url: string;
  keys_url: string; // "{/key_id}"
  collaborators_url: string; // "{/collaborator}"
  teams_url: string;
  hooks_url: string;
  issue_events_url: string; // "{/number}"
  events_url: string;
  assignees_url: string; // "{/user}"
  branches_url: string; // "{/branch}"
  tags_url: string;
  blobs_url: string; // "{/sha}"
  git_tags_url: string; // "{/sha}"
  git_refs_url: string; // "{/sha}"
  trees_url: string; // "{/sha}"
  statuses_url: string; // "{sha}"
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string; // "{/sha}"
  git_commits_url: string; // "{/sha}"
  comments_url: string; // "{/number}"
  issue_comment_url: string; // "{/number}"
  contents_url: string; // "{+path}"
  compare_url: string; // "{base}...{head}"
  merges_url: string;
  archive_url: string; // "{archive_format}{/ref}"
  downloads_url: string;
  issues_url: string; // "{/number}"
  pulls_url: string; // "{/number}"
  milestones_url: string; // "{/number}"
  notifications_url: string; // "{?since,all,participating}"
  labels_url: string; // "{/name}"
  releases_url: string; // "{/id}"
  deployments_url: string;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  pushed_at: string; // ISO date string

  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;

  homepage: string | null;

  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;

  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;

  forks_count: number;
  mirror_url: string | null;

  archived: boolean;
  disabled: boolean;

  open_issues_count: number;

  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
    node_id: string;
  } | null;

  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;

  topics: string[];

  visibility: string; // e.g. "public"
  forks: number;
  open_issues: number;
  watchers: number;

  default_branch: string;
  score: number;
}
