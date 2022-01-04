import axios from "axios";

export async function getPhotoListFromTerm(term: string) {
  const response = await axios(
    `https://api.unsplash.com/search/photos?query=${term}&squarish=squarish`,
    {
      headers: {
        "Accept-Version": "v1",
        Authorization: "Client-ID LiWknz3W0r8IpWHcQQYwdhiz6D_aRaYU3Ve53Qj4OZ4",
      },
    }
  );
  return response.data?.results?.map((res: any) => res.urls?.small);
  return [
    "https://images.unsplash.com/photo-1617333387457-e5d7e2c43a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHwxfHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1628977479910-583755967ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHwyfHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1629118344721-507e072f2c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHwzfHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1628977621881-8a9ea864ef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw0fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1585308013711-6b134e2c6a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw1fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1629040664788-939a63cd1298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw2fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1567361602723-27ed7ded08fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw3fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1598943519169-181dec2e155a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw4fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1566942482387-e8dc927e5829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgxNTF8MHwxfHNlYXJjaHw5fHxEb3xlbnwwfHx8fDE2NDEyNTM5NDY&ixlib=rb-1.2.1&q=80&w=400",
  ];
}
