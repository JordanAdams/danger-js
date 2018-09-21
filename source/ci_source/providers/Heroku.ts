import { Env, CISource } from "../ci_source"
import { getPullRequestIDForBranch, ensureEnvKeysExist } from "../ci_source_helpers"

/**
 *  ### CI Setup
 *
 *  Add your repo details to `app.json`
 *
 *  ```
 *  {
 *    "environments": {
 *      "test": {
 *        "env": {
 *          "CI_REPO_SLUG": "danger/danger-js",
 *          "CI_REPO_URL": "https://github.com/danger/danger-js"
 *        }
 *      }
 *    }
 *  }
 *  ```
 *
 *  ### Token Setup
 *
 *  Add your `DANGER_GITHUB_API_TOKEN` to the Heroku CI section of your pipeline settings
 *
 */
export class Heroku implements CISource {
  private prID: string = ''

  constructor(private readonly env: Env) {}

  async setup(): Promise<void> {
    const prID = await getPullRequestIDForBranch(this, this.env, this.env["HEROKU_TEST_RUN_BRANCH"])

    this.prID = prID.toString();
  }

  get name(): string {
    return "Heroku CI"
  }

  get isCI(): boolean {
    return ensureEnvKeysExist(this.env, ["HEROKU_CI"])
  }

  get isPR(): boolean {
    return ensureEnvKeysExist(this.env, ["HEROKU_TEST_RUN_BRANCH"])
      && ensureEnvKeysExist(this.env, ["HEROKU_TEST_RUN_COMMIT_VERSION"])
      && ensureEnvKeysExist(this.env, ["CI_REPO_SLUG"])
      && ensureEnvKeysExist(this.env, ["CI_REPO_URL"])
  }

  get pullRequestID(): string {
    return this.prID
  }

  get repoSlug(): string {
    return this.env["CI_REPO_SLUG"]
  }

  get repoURL(): string {
    return this.env["CI_REPO_URL"]
  }
}
