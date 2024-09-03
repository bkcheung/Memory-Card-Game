import { describe, it, expect, vitest, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

//mock fetch
window.fetch = vi.fn(() => {
  const data = [{ name: 'Rosie', image_url: 'https://dodo.ac/np/images/f/fe/Rosie_NH_Transparent.png' },
                { name: 'Tangy', image_url: '' },
                { name: 'Stinky', image_url: '' },
                { name: 'Kid Kat', image_url: '' },
                { name: 'Lolly', image_url: '' },
                { name: 'Katt', image_url: '' }];
  return Promise.resolve({
    ok: true, 
    json: () => Promise.resolve(data),
  });
});

describe('App', () => {
  it('renders page'),() =>{
    const page = render(<App/>)
    expect(page).toMatchSnapshot();
  }
  it('instructions appear', () => {
    render(<App/>);
    expect(screen.getByText("Click on each villager once to score points; no repeats!")).toBeInTheDocument();

  });
  it('music can be toggled', async () => {
    render(<App/>);
    const button = screen.getByRole('button',{name:"music"});
    await userEvent.click(button);
    expect(button.classList.contains("off")).toBe(true);
    await userEvent.click(button);
    expect(button.classList.contains("off")).toBe(false);
  });
  it('cards render', async ()=>{
    render(<App/>);
    const rosie = await screen.findByText('Rosie');
    expect(rosie).toBeInTheDocument();
  }),
  it('score loads with correct maximum score', async ()=>{
    render(<App/>);
    const score = await screen.findByText("Score: 0/", {exact:false})
    expect(score.textContent).toMatch("Score: 0/6");
  }),
  it('score increments', async ()=>{
    render(<App/>);
    const score = await screen.findByText("Score: 0/", {exact:false})
    const card = await screen.findByText('Tangy');
    await userEvent.click(card);
    expect(score.textContent).toMatch("Score: 1/6");
  }),
  it('game can be lost', async ()=>{
    render(<App/>);
    let card = await screen.findByText('Tangy');
    await userEvent.click(card);
    card = await screen.findByText('Tangy');
    await userEvent.click(card);
    const gameoverHidden = screen.getByRole('button',{name:"gameover"}).classList.contains('hidden');
    expect(gameoverHidden).toBe(false);
  }),
  it('game can be won', async ()=>{
    render(<App/>);
    const score = await screen.findByText("Score: 0/", {exact:false})
    let card = await screen.findByText('Rosie');
    await userEvent.click(card);
    card = await screen.findByText('Tangy');
    await userEvent.click(card);
    card = await screen.findByText('Stinky');
    await userEvent.click(card);
    card = await screen.findByText('Kid Kat');
    await userEvent.click(card);
    card = await screen.findByText('Lolly');
    await userEvent.click(card);
    card = await screen.findByText('Katt');
    await userEvent.click(card);
    expect(score.textContent).toMatch("Score: 6/6");
    const gameWonHidden = screen.getByRole('button',{name:"gameWon"}).classList.contains('hidden');
    expect(gameWonHidden).toBe(false);
  })
});