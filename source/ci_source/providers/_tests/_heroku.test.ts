import { Heroku } from "../Heroku"
import { getCISourceForEnv } from "../../get_ci_source"

jest.mock('../../ci_source_helpers', () => {
  const original = require.requireActual("../../ci_source_helpers");

  return {
    ...original,
    getPullRequestIDForBranch: jest.fn(async () => 1234)
  };
})

const correctEnv = {
  HEROKU_CI: "true",
  HEROKU_TEST_RUN_BRANCH: "mybranch",
  HEROKU_TEST_RUN_COMMIT_VERSION: "mycommit",
  CI_REPO_SLUG: "danger/danger-js",
  CI_REPO_URL: "https://github.com/danger/danger-js"
}

describe("being found when looking for CI", () => {
  it.only("finds Heroku with the right ENV", () => {
    const ci = getCISourceForEnv(correctEnv)
    expect(ci).toBeInstanceOf(Heroku)
  })
})

describe(".isCI", () => {
  it("validates when all Heroku environment vars are set", () => {
    const heroku = new Heroku(correctEnv)
    heroku.setup();

    expect(heroku.isCI).toBeTruthy()
  })

  it("does not validate without env", () => {
    const heroku = new Heroku({})
    heroku.setup();

    expect(heroku.isCI).toBeFalsy()
  })
})

describe(".isPR", () => {
  it("validates when all Heroku environment vars are set", () => {
    const heroku = new Heroku(correctEnv)
    heroku.setup();

    expect(heroku.isPR).toBeTruthy()
  })

  it("does not validate outside of Heroku", () => {
    const heroku = new Heroku({})
    heroku.setup();

    expect(heroku.isPR).toBeFalsy()
  })

  const envs = [
    "HEROKU_TEST_RUN_BRANCH",
    "HEROKU_TEST_RUN_COMMIT_VERSION",
    "CI_REPO_URL",
    "CI_REPO_SLUG"
  ]

  envs.forEach((key: string) => {
    let env = { ...correctEnv, [key]: undefined }

    it(`does not validate when ${key} is missing`, () => {
      const heroku = new Heroku(env)
      heroku.setup();

      expect(heroku.isPR).toBeFalsy()
    })
  })
})

describe(".pullRequestID", () => {
  it("gets it from pull request", () => {
    const heroku = new Heroku(correctEnv)
    heroku.setup();

    expect(heroku.pullRequestID).toEqual("1234")
  })
})

describe(".repoSlug", () => {
  it("derives it from the env", () => {
    const heroku = new Heroku(correctEnv);
    heroku.setup();

    expect(heroku.repoSlug).toEqual(correctEnv["CI_REPO_SLUG"])
  })
})

describe(".repoURL", () => {
  it("derives it from the env", () => {
    const heroku = new Heroku(correctEnv);
    heroku.setup();

    expect(heroku.repoURL).toEqual(correctEnv["CI_REPO_URL"])
  })
})
