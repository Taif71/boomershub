// export const rootFolders = [
//     {
//         name: "Folder-1"
//     },
//     {
//         name: "Folder-2"
//     },
//     {
//         name: "Folder-3"
//     },
//     {
//         name: "Folder-4"
//     }
// ]


export const folderTreeView = [
    {   
        id: '1',
        name: "Folder-1",
        type: "folder",
        contents: [
            {
                id: '2',
                name: "nested-1",
                type: "folder",
                contents: [
                    {
                        id: '39',
                        name: "nested-folder-1",
                        type: "folder",
                        contents: [
                            {
                                id: '100',
                                name: "nested-file-1",
                                type: "file",
                                contents: []
                            }
                        ]
                    },
                    {        
                        id: '99',              
                        name: "nested-file-1.pdf",
                        type: "file",
                        contents: []
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        name: "Folder-2",
        type: "folder",
        contents: [
            {
                id: '31',
                name: "nested-folder-1",
                type: "folder",
                contents: [
                    {
                        name: "nested-file-1",
                        type: "file",
                        contents: []
                    }
                ]
            },
            {                        
                name: "nested-file-1.pdf",
                type: "file",
                contents: []
            }
        ]
    },
    {
        id: "99",
        name: "Folder-3",
        type: "folder",
        contents: [
            {
                id: '3',
                name: "nested-folder-1",
                type: "folder",
                contents: [
                    {
                        name: "nested-file-1",
                        type: "file",
                        contents: []
                    }
                ]
            },
            {                        
                name: "nested-file-1.pdf",
                type: "file",
                contents: []
            }
        ]
    }
]