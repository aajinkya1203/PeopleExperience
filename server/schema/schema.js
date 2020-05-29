const graphql = require('graphql');
const _ = require('lodash')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
    } = graphql;

const dummyData = [
    {id:'1', name:"Aajinkya",tag:"Other", problem:"Lorem Ipsum blah blah blah", districtID:'18'},
    {id:'2', name:"Not Aajinkya",tag:"Food", problem:"Lorem Ipsum blah blah blah", districtID:'1'},
    {id:'3', name:"Test Aajinkya",tag:"Service Problems", problem:"Lorem Ipsum blah blah blah", districtID:'5'}
]
const dummyData2 = [
    {id:'1',name:'Ahmednagar'},
    {id:'2',name:'Akola'},
    {id:'3',name:'Amravati'},
    {id:'4',name:'Aurangabad'},
    {id:'5',name:'Beed'},
    {id:'6',name:'Bhandara'},
    {id:'7',name:'Buldhana'},
    {id:'8',name:'Chandrapur'},
    {id:'9',name:'Dhule'},
    {id:'10',name:'Gadchiroli'},
    {id:'11',name:'Gondia'},
    {id:'12',name:'Hingoli'},
    {id:'13',name:'Jalgaon'},
    {id:'14',name:'Jalna'},
    {id:'15',name:'Kolhapur'},
    {id:'16',name:'Latur'},
    {id:'17',name:'Mumbai City'}, 
    {id:'18',name:'Mumbai Suburban'}, 
    {id:'19',name:'Nagpur'},
    {id:'20',name:'Nanded'},
    {id:'21',name:'Nandurbar'},
    {id:'22',name:'Nashik'},
    {id:'23',name:'Osmanabad'},
    {id:'24',name:'Palghar'},
    {id:'25',name:'Parbhani'},
    {id:'26',name:'Pune'},
    {id:'27',name:'Raigad'},
    {id:'28',name:'Ratnagiri'},
    {id:'29',name:'Sangli'},
    {id:'30',name:'Satara'},
    {id:'31',name:'Sindhudurg'},
    {id:'32',name:'Solapur'},
    {id:'33',name:'Thane'},
    {id:'34',name:'Wardha'},
    {id:'35',name:'Washim'},
    {id:'36',name:'Yavatmal'}
]

const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tag: { type: GraphQLString },
        problem: { type: GraphQLString },
        district: {
            type: DistrictType,
            resolve(parent,args){
                console.log(parent)
                return _.find(dummyData2, { id: parent.districtID })
            }
        }
    })
});

const DistrictType = new GraphQLObjectType({
    name: 'District',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Blog:{
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //do some fetching to db / api call
                return _.find(dummyData, { id: args.id })
            }
        },
        District: {
            type: DistrictType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args){
                return _.find(dummyData2, { id: args })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})