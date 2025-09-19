
import {connectDB} from '../server'
import db from '../config/db'





jest.mock('../confin/db')

describe('ConnectDB', () => {
    it('should handle database connection error', async() =>{
        jest.spyOn(db,'authenticate').mockRejectedValue(new Error('Hubo un error al conectar la db'))
        const conloseSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(conloseSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la db')
        )
    })
})