// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    auth_api: "http://localhost:9000/api/auth",
    sign_in: "sign_in",
    sign_up: "sign_up",
    sign_out: "sign_out",
    get_user: "user",
    activation: "account/activation",
    password_recovery: "password/recovery",
    csrfCookieName: "PLAY_CSRF_TOKEN"

};
