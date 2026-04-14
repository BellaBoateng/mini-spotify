# Spotify Library - Mini Project

# List of sing including title, artist and genere as atributes 
# Title is the label and : "input" is the value 
songs = [
    {"title": "In Fact", "artist": "Gabzy", "genre": "Afrobeats"},
    {"title": "Jealousy", "artist": "Khalil Harrison & Tyler ICU", "genre": "Amapiano"},
    {"title": "On the Low", "artist": "Burna Boy", "genre": "Afrobeats"},
    {"title": "Free Mind", "artist": "Tems", "genre": "R&B Afrobeats"}
]

# Create empty dictionary
playlists = {}

# Function to print the app title 
def show_header():
    print("=" * 45)
    print("🎵            SPOTIFY LIBRARY            🎵")
    print("=" * 45)

# Function to print list of songs in library 
def show_songs(): 
    print("\nYour Songs:\n")

    for index, song in enumerate(songs, start=1):
        print(f"{index}. {song['title']}")
        print(f"  Artist: {song['artist']}")
        print(f"  Genre: {song['genre']}\n")

# Function to show menu options
def show_menu():
    print("\nWhat would you like to do?: ")
    print("1. View Songs")
    print("2. Search Songs")
    print("3. Create Playlist")
    print("4. Add Song to Playlist")
    print("5. View Playlist")
    print("6. Exit")

# Function to search for a song in the library
def search_songs():
    search_term = input("\nEnter a song title to search: ").lower()
    found = False 

    print("\nSearch results:\n")

    for song in songs:
        if search_term in song['title'].lower():
            print(f"{song['title']}")
            print(f"  Artist: {song['artist']}")
            print(f"  Genre: {song['genre']}\n")
            found = True
    
    if found == False:
        print("No matching songs found.\n")

# Function to ceate, add and view playist
def create_playlist():
    playlist_name = input("\nEnter a name for your new playlist: ").strip()

    if playlist_name in playlists: # Handles duplications 
        print("\nThat playlist already exist.\n")
    elif playlist_name == "":
        print("\nPlaylist name cannot be empty.\n") # Handles no entry
    else:
        playlists[playlist_name] = []
        print(f"\nPlaylist '{playlist_name}' created successfully.\n")

# Function to add songs to a playlist
def add_song_to_playlist():
    if not playlists:
        print("\nYou need to create a playlist first\n") 
        return
    
    print("\nYour Playlist:")
    for name in playlists:
        print(f"- {name}")
    
    playlist_name = input("\nEnter the playlist name: ").strip()

    if playlist_name not in playlists:
        print("\nThat Playlist does not exist.\n")
        return
    
    print("\nAvailable Songs:\n")
    for index, song in enumerate(songs, start=1):
        print(f"{index}, {song['title']}")
        print(f"  Artist: {song['artist']}")
        print(f"  Genre: {song['genre']}\n")

    song_choice = input("Enter the number of the song to add: ").strip()

    if not song_choice.isdigit():
        print("\nPlease enter valid number.\n")
        return

    song_index = int(song_choice) - 1

    if song_index < 0 or song_index >= len(songs):
        print("\nThat sing number is out of range.\n")
        return

    selected_song = songs[song_index]          
    playlists[playlist_name].append(selected_song)

    print(f"\n'{selected_song['title']}' was added to '{playlist_name}'.\n")

# Function to display contents of a selected playlist 
def view_playlist():
    if not playlists:
        print("\nNo playlist created yet.\n")
        return 
    
    print ("\nYour Playlist:\n")

    for playlist_name, playlist_songs in playlists.items():
        print(f"🎵 {playlist_name}")

        if not playlist_songs:
            print("  (empty)\n")
            continue
        
        for index, song in enumerate(playlist_songs, start=1):
            print(f"   {index}. {song['title']} — {song['artist']}")

        print()


# Main control center 
def main():
    show_header()

    while True:
        show_menu()
        choice = input("\nEnter your choice: ")

        if choice == "1":
            show_songs()
        elif choice == "2":
            search_songs()
        elif choice == "3":
            create_playlist()
        elif choice == "4":
            add_song_to_playlist()
        elif choice == "5":
            view_playlist()
        elif choice == "6":
            print ("\nGoodbye!")
            break
        else:
            print("\nThat option is not ready yet.")

main() 