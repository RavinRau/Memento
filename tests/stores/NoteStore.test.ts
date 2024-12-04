import { NoteStore } from "@/stores/NoteStore";

describe('NoteStore', () => {
    let noteStore: NoteStore;

    beforeEach(() => {
        // Initialize a fresh store before each test
        noteStore = new NoteStore();
    });

    it('should initialize with empty notes', () => {
        expect(noteStore.notes).toEqual([]);
    });

    // // Example test for adding a note
    // it('should add a new note', () => {
    //     const newNote = {
    //         id: '1',
    //         title: 'Test Note',
    //         content: 'Test Content',
    //         folderId: '1'
    //     };

    //     noteStore.addNote(newNote);
    //     expect(noteStore.notes).toHaveLength(1);
    //     expect(noteStore.notes[0]).toEqual(newNote);
    // });

    // // Example test for deleting a note
    // it('should delete a note', () => {
    //     const note = {
    //         id: '1',
    //         title: 'Test Note',
    //         content: 'Test Content',
    //         folderId: '1'
    //     };

    //     noteStore.addNote(note);
    //     expect(noteStore.notes).toHaveLength(1);

    //     noteStore.deleteNote('1');
    //     expect(noteStore.notes).toHaveLength(0);
    // });
}); 