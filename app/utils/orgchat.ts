export const orgChat = (data: any, key:any) : any => {
    console.log('orgchat data receive is', data)

    if(data?.data.length == 1){
        console.log('une seule donné', key)
        console.log('id', data.data[0].id)
        let mySchema = {
            name: key.key,
            children: [
                {
                    name: 'Adresses',
                    attributes: data.data[0].addresses
                },
                {
                    name: 'Email',
                    attributes: data.data[0].emails
                },
                {
                    name: 'Names',
                    attributes: data.data[0].names
                },
                {
                    name: 'Phones',
                    attributes: data.data[0].phones
                },
                {
                    name: 'Social Media',
                    attributes: data.data[0].social_medias
                },
                {
                    name: 'Images',
                    attributes: data.data[0].images
                },
                {
                    name: 'Username',
                    attributes: data.data[0].usernames
                },
            ]
        }

        return mySchema
    }else{
        console.log('plusieurs donnéees')
        let mySchema:any = []
        for(let item of data?.data){
            let value = {
                name: key.key,
                children: [
                    {
                        name: 'Adresses',
                        attributes: item.addresses
                    },
                    {
                        name: 'Email',
                        attributes: item.emails
                    },
                    {
                        name: 'Names',
                        attributes: item.names
                    },
                    {
                        name: 'Phones',
                        attributes: item.phones
                    },
                    {
                        name: 'Social Media',
                        attributes: item.social_medias
                    },
                    {
                        name: 'Username',
                        attributes: item.usernames
                    },
                ]
            }
            mySchema.push(value)
        }
        return mySchema
    }
//     let schema = {
//     name: 'becker@gmail.com',
//     children: [
//       {
//         name: 'Email type',
//         attributes: {
//           Emailtype: 'Professional email',
//         },
//         children: [
//           {
//             name: 'Facebook',
//             attributes: {
//               number: '0023769678890',
//               userAccount: 'beckerkadji',
//             }
//           },
//           {
//             name: 'Instagram',
//             attributes: {
//                 username: 'kadjibecker',
//                 userAccount: 'beckerkadji',
//             }
//           },
//           {
//             name: 'Location',
//             attributes: {
//                 Country: 'Cameroun',
//                 city: 'Yaounde',
//                 distric: 'Yaounde 3iem',
//             }
//           },
//           {
//             name: 'Recent Activity',
//             attributes: {
//                 username: 'kadjibecker',
//                 userAccount: 'beckerkadji',
//             }
//           },
//         ],
//       },
//     ],
//   };

}