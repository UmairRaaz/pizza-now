export async function POST(req){
    let data = await req.FormData();
    console.log(data);
    
    if(data.get('file')){
        console.log("we get a file", data.get('file'));
    }

    return Response.json(true);
}