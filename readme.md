# Torrent File Organizer

This project aims to watch a directory for changes, specifically for extracting files after torrent downloads. It looks for media files and moves them to a specific directory to be served by a media server. It then deletes the subdirectory created by the torrent client if it becomes empty.

## Features

- Watches a specified directory for new media files.
- Moves media files (`.mp4`, `.mkv`, `.avi`) to a designated media directory.
- Ensures files are fully written before moving them.
- Deletes empty subdirectories after moving files.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- Proper permissions to read from and write to the directories being watched and moved.

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/yourusername/torrent-file-organizer.git
    cd torrent-file-organizer
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Update the paths in the script to match your setup:
    ```javascript
    const mediaDir = '/media/ssd/torrent/files/movies';
    const watchDir = '/media/ssd/torrent/files';
    ```

2. Run the script:
    ```sh
    node index.js
    ```

3. If needed, run the script with elevated permissions to ensure it can access and modify the files:
    ```sh
    sudo node index.js
    ```

## Script Details

- **Watcher Setup**: Uses `chokidar` to watch the specified directory for new files and directories.
- **File Check**: Ensures files are fully written before moving by checking file size stability over 1 second intervals.
- **File Move**: Moves detected media files to the specified media directory.
- **Directory Cleanup**: Deletes subdirectories if they become empty after file moves.

## Error Handling

The script includes error handling for common issues such as permission errors and read/write errors, with appropriate logging to the console.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## Acknowledgments

- [chokidar](https://github.com/paulmillr/chokidar) - A neat wrapper around Node.js fs.watch / fs.watchFile / fsevents.

---

This project simplifies the process of organizing downloaded media files, ensuring they are quickly and efficiently moved to the appropriate directory for serving via a media server.


