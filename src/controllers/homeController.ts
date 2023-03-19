import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User'

export const home = async (req: Request, res: Response)=>{
    //  Métodos finder
    // const [ name, created] = await User.findOrCreate({
    //     where: { usuario: 'hub'},
    //     defaults: {
    //         name: 'hub',
    //         age: 90
    //     }
    // });

    // if(created) {
    //     console.log("Usário criado com sucesso!");
    // } else {
    //     console.log("Achamos o usuario.");
    // }
    // console.log("nome: ", name.usuario)


    // let results = await User.findAll({where: { id: 7}});
    // if(results.length > 0) {
    //     let name = results[0];
    //     name.age = 70;
    //     await name.save();
    // }



    //                   1.Dados a serem alterados
    // await User.update({ usuario: 'senhor', age: 56 }, {
         //2.Condição para serem alterados
    //     where: {
    //         id: 4
    //     }
    // });

    let users = await User.findAll();

     //inserindo dadod com sequelize

     //using create
    //const user = await User.create({
    //    usuario:'joao',
   //     age:33
   // });
    
   //using build
   // const user = User.build({
       // usuario: 'fulano',
       // age:25
        
    //});
    //await user.save();
 

    // let users = await User.findAll({
       // where: {
          //  age: {[Op.gte]: 18}


            //operadores de filtro
                /* [Op.like]: 'j%'  //
                // [Op.notIn]: [30, 55]
                // [Op.Between]: [40, 100]
                // [Op.notBetween]: [40, 100]
                // [Op.gt]: 40, // > 40
                // [Op.gte]: 40, // >= 40
                //  [Op.lt]: 70, // < 40
                // [Op.lte]: 40 // <= 40*/
            

            //método mais simples sem uso do Op do sequelize
            // age: [55, 30]
            //condição OR para objetos definindo os valores
            /*[Op.or]: [
                {age: 19},
                {usuario: 'paulo'}
            ]*/
            //Condição na definição de valores do objeto
            /*age: {
                [Op.or]: [19, 55]
            }*/
            //Combinação dos dois
            /*[Op.or]: [
                {
                    age: {
                        [Op.or]: [55, 78]
                    }
                },
                {
                    usuario: {
                        [Op.or]: ['paulo', 'joana']
                    }
                }
            ]*/ 
        // },
        //limitando resultados
        //offset: 2 pula dois itens
        //limit: 2 exibi dois itens
        // order: [
        //     ['age', 'ASC'],
        //     ['usuario', 'DESC']
        //]

    // });

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req: Request, res: Response) => {
    let { usuario, age } = req.body;

    if(usuario) {
        const newUser = User.build({ usuario });

        if(age) {
            newUser.age = parseInt(age);
        }

        await newUser.save();
    } 

    res.redirect('/'); 
};


export const deletarUsuario = async(req: Request, res: Response) => {
    let id: string = req.params.id

    await User.destroy({
        where:{id}
    } );    
    res.redirect('/');
}

export const subir = async (req: Request, res: Response) =>{
     let id:string = req.params.id;
     let  idade = await User.findAll({where:{id}});
     if(idade.length > 0){
        let number = idade[0];
        number.age++;
        await number.save();
     }
     res.redirect('/');
}
export const descer = async (req: Request, res: Response) =>{
     let id:string = req.params.id;
     let  idade = await User.findAll({where:{id}});
     if(idade.length > 0){
        let number = idade[0];
        number.age--;
        await number.save();
     }
     res.redirect('/');
}