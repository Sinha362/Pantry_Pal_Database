/*
  # Add bookmarks table for recipe bookmarking

  1. New Tables
    - `bookmarked_recipes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `recipe_id` (text, unique identifier for the recipe from external API)
      - `title` (text, recipe title)
      - `image` (text, recipe image URL)
      - `category` (text, recipe category)
      - `ingredients` (jsonb, array of ingredients)
      - `instructions` (jsonb, array of instructions)
      - `similarity_score` (integer, similarity score when bookmarked)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookmarked_recipes` table
    - Add policy for users to read their own bookmarks
    - Add policy for users to insert their own bookmarks
    - Add policy for users to delete their own bookmarks

  3. Changes
    - Add trigger to automatically update `updated_at` column
    - Add unique constraint on user_id + recipe_id to prevent duplicate bookmarks
*/

CREATE TABLE IF NOT EXISTS bookmarked_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_id text NOT NULL,
  title text NOT NULL,
  image text,
  category text,
  ingredients jsonb DEFAULT '[]'::jsonb,
  instructions jsonb DEFAULT '[]'::jsonb,
  similarity_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, recipe_id)
);

ALTER TABLE bookmarked_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookmarks"
  ON bookmarked_recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON bookmarked_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarked_recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_bookmarked_recipes_updated_at
  BEFORE UPDATE ON bookmarked_recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();