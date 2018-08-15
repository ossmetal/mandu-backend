

loginString = `
<div id='login-page' class='container-fluid'>
<div class='row'>
  <div class='col col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12'>
    <div class='col col-lg-12 align-items-center logo text-center'>
      <img src='/img/logo_login.svg' width='50%' />
    </div>
    <form  class='form login-form' autoComplete='off'>
      <div class='col'>
        <FontAwesome class='input-fa' name='user-o' />
        <input
          class='width100 login-input user-input'
          placeholder='Usuario'
          errorText={this.state.error.user}
          name='user'
          id='user'
        />
      </div>
      <div id='passwordBox' class='col'>
        <input
          type = "password"
          class='width100 login-input password-input'
          errorText={this.state.error.password}
          name='password'
        />
      </div>
      <div class='col'>
        <p>{error}</p>
      </div>
      <div class='col col-lg-12 text-center'>
        <input class='button-submit' type='submit' label='Ingresar' />
      </div>
      <div class='col col-lg-12 text-center'>
      </div>
    </form>
  </div>
</div>
</div>
`
class index{
    constructor(){
        this.setLayout = this.setLayout.bind(this)
    }
    setLayout(element){
        const indexString =`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Sample Site</title>
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
                <link rel="stylesheet" href="css/style.css">
                    
            </head>
         <body>

            <div class="container">
                ${element}
            </div>

        </body>
    </html>
`;
        return indexString;
    }

    createIndex(){
        return  this.setLayout(loginString);
    }
    
}
module.exports = index;