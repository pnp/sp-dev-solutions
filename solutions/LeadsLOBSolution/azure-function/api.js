module.exports = function (context, req) {
  var data = [
    {
      account: 'Litware',
      title: 'DG-2000',
      description: 'Bulk order of drones for upcoming holiday season',
      createdBy: {
        email: 'isaiahl@contosodemos.onmicrosoft.com',
        name: 'Isaiah Langer'
      },
      createdOn: new Date(2018, 8, 9),
      comments: [
        {
          comment: 'Need any help? I worked with Litware in the past',
          createdBy: {
            email: 'meganb@contosodemos.onmicrosoft.com',
            name: 'Megan Bowen'
          },
          date: new Date(2018, 8, 10)
        },
        {
          comment: 'Keep in mind their FY',
          createdBy: {
            email: 'adelev@contosodemos.onmicrosoft.com',
            name: 'Adele Vance'
          },
          date: new Date(2018, 8, 10)
        }
      ],
      percentComplete: 80,
      change: 20
    },
    {
      account: 'Northwind',
      title: 'DG-1000',
      description: 'Repeated order by Northwind',
      createdBy: {
        email: 'adelev@contosodemos.onmicrosoft.com',
        name: 'Adele Vance'
      },
      createdOn: new Date(2018, 8, 1),
      comments: [],
      percentComplete: 80,
      change: 20
    },
    {
      account: 'AdventureWorks',
      title: 'Drone Controller 3300',
      description: 'First order of a new customer',
      createdBy: {
        email: 'isaiahl@contosodemos.onmicrosoft.com',
        name: 'Isaiah Langer'
      },
      createdOn: new Date(2018, 8, 4),
      comments: [
        {
          comment: 'Dont forget to include the new account material',
          createdBy: {
            email: 'meganb@contosodemos.onmicrosoft.com',
            name: 'Megan Bowen'
          },
          date: new Date(2018, 8, 7)
        },
        {
          comment: 'Have you mentioned DG-2000 to them too?',
          createdBy: {
            email: 'lidiah@contosodemos.onmicrosoft.com',
            name: 'Lidia Holloway'
          },
          date: new Date(2018, 8, 8)
        },
        {
          comment: 'They mentioned they might have problems securing the budget. Could we propose a better deal to close it in this quarter?',
          createdBy: {
            email: 'isaiahl@contosodemos.onmicrosoft.com',
            name: 'Isaiah Langer'
          },
          date: new Date(2018, 8, 8)
        },
        {
          comment: 'Let\'s discuss with @Miriam',
          createdBy: {
            email: 'lidiah@contosodemos.onmicrosoft.com',
            name: 'Lidia Holloway'
          },
          date: new Date(2018, 8, 4)
        }
      ],
      percentComplete: 60,
      change: -20,
      requiresAttention: true
    },
    {
      account: 'Northwind',
      title: 'DG-2000',
      description: 'Small batch of DG-2000 for testing and promotion. Will need to be delivered quickly',
      createdBy: {
        email: 'adelev@contosodemos.onmicrosoft.com',
        name: 'Adele Vance'
      },
      createdOn: new Date(2018, 8, 1),
      comments: [],
      percentComplete: 0,
      change: 0,
      requiresAttention: true
    },
    {
      account: 'Litware',
      title: 'DG-1000',
      description: 'Repeated order by Litware',
      createdBy: {
        email: 'isaiahl@contosodemos.onmicrosoft.com',
        name: 'Isaiah Langer'
      },
      createdOn: new Date(2018, 8, 7),
      comments: [
        {
          comment: 'Let\'s see if we can upgrade them to DG-2000',
          createdBy: {
            email: 'isaiahl@contosodemos.onmicrosoft.com',
            name: 'Isaiah Langer'
          },
          date: new Date(2018, 8, 7)
        }
      ],
      percentComplete: 10,
      change: 10
    },
    {
      account: 'Contoso',
      title: 'ZT-1000',
      createdBy: {
        email: 'isaiahl@contosodemos.onmicrosoft.com',
        name: 'Isaiah Langer'
      },
      createdOn: new Date(2018, 8, 20),
      comments: [],
      percentComplete: 30,
      change: 10
    }
  ];
  context.res = {
      body: data/*,
      headers: {
          "Access-Control-Allow-Credentials" : "true",
          "Access-Control-Allow-Origin" : "https://contosodemosg.sharepoint.com"
      }*/
  };
  context.done();
};
