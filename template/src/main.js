import app from 'app'
import view from 'components/root'
import providers from 'src/config/providers'
import directory from 'utilities/directory'
let modules = directory('store/modules')

app.boot(providers).load(modules).render(view)
